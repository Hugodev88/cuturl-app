const Url = require('../models/Url');
const User = require('../models/User');
const shortid = require('shortid');
const bcrypt = require('bcryptjs');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, password, expiresAt } = req.body;
    const user = await User.findById(req.user.userId);

    if (user.role === 'free' && user.urlCount >= 10) {
      return res.status(403).send('Free users can only shorten up to 10 URLs.');
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const shortUrl = shortid.generate();
    const url = new Url({
      originalUrl,
      shortUrl,
      user: user._id,
      password: hashedPassword,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    await url.save();

    user.urlCount++;
    await user.save();

    res.status(201).json(url);
  } catch (error) {
    res.status(500).send('Error shortening URL');
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const { password: providedPassword } = req.query; // Password from query parameter

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).send('URL not found');
    }

    // Check for expiration
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).send('URL has expired'); // 410 Gone
    }

    // Check for password protection
    if (url.password) {
      if (!providedPassword) {
        // If password is required but not provided, redirect to a password input page
        return res.redirect(`http://localhost:5173/password-required?shortUrl=${shortUrl}`);
      }
      const isPasswordValid = await bcrypt.compare(providedPassword, url.password);
      if (!isPasswordValid) {
        return res.status(401).send('Invalid password');
      }
    }

    // Record analytics
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    url.clicks++;
    url.analytics.push({
      ipAddress,
      userAgent,
      // country: '' // Placeholder for future country detection
    });
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).send('Error redirecting URL');
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const { password: providedPassword } = req.body;

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).send('URL not found');
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).send('URL has expired');
    }

    if (!url.password) {
      return res.status(400).send('This URL is not password protected.');
    }

    const isPasswordValid = await bcrypt.compare(providedPassword, url.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    url.clicks++;
    url.analytics.push({
      ipAddress,
      userAgent,
    });
    await url.save();

    res.json({ originalUrl: url.originalUrl });
  } catch (error) {
    res.status(500).send('Error verifying password');
  }
};

exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user.userId });
    res.json(urls);
  } catch (error) {
    res.status(500).send('Error fetching URLs');
  }
};

exports.getUrlAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findOne({ _id: id, user: req.user.userId });

    if (!url) {
      return res.status(404).send('URL not found or not authorized');
    }

    res.json({ clicks: url.clicks, analytics: url.analytics });
  } catch (error) {
    res.status(500).send('Error fetching analytics');
  }
};
