const { createMessage, getAllMessages } = require('../db/queries');
const { formatDate } = require('../lib/passwordutils');

exports.getCreateMessage = (req, res) => {
  if (!req.user) return res.redirect('/login');
  res.render('createmessage', { errors: null, formData: {} });
};

exports.postCreateMessage = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  
  const { title, text } = req.body;
  const errors = [];
  
  if (!title || !text) {
    errors.push({ msg: 'Title and text are required' });
  }
  
  if (errors.length > 0) {
    return res.render('createmessage', { errors, formData: req.body });
  }
  
  try {
    await createMessage(title, text, req.user.id);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const messages = await getAllMessages();
    
    const formattedMessages = messages.map(message => ({
      ...message,
      formatted_date: formatDate(message.created_at),
      can_see_author: req.user && req.user.membership_status
    }));
    
    res.render('index', { 
      messages: formattedMessages, 
      user: req.user 
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).send('Forbidden');
  }
  
  try {
    const { deleteMessage } = require('../db/queries');
    await deleteMessage(req.params.id);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};