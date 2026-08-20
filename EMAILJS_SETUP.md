# EmailJS Setup Guide for Contact Form

Your contact form is now integrated with EmailJS to send emails directly to **adeoluwafisayomi@gmail.com**.

## 📧 Setup Steps

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended for Gmail accounts)
4. Connect your Gmail account: `adeoluwafisayomi@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up the template with these fields:

**Template Content:**
```
Subject: {{subject}} - Portfolio Contact

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

**Template Variables:**
- `from_name` - Sender's name
- `from_email` - Sender's email
- `subject` - Email subject
- `message` - Message content
- `to_email` - Your email (adeoluwafisayomi@gmail.com)

4. In "To email" field, enter: `{{to_email}}` or directly `adeoluwafisayomi@gmail.com`
5. Copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `a1b2c3d4e5f6g7h8`)
3. Copy it

### 5. Update Your Code

Open `/src/pages/Contact.tsx` and update these values (around line 32-34):

```typescript
const serviceId = 'service_abc123'; // Replace with your Service ID
const templateId = 'template_xyz789'; // Replace with your Template ID
const publicKey = 'a1b2c3d4e5f6g7h8'; // Replace with your Public Key
```

### 6. Test the Form

1. Go to your portfolio at `http://localhost:5173/contact`
2. Fill out the contact form
3. Submit it
4. Check your email: `adeoluwafisayomi@gmail.com`

## 🔒 Security Notes

- EmailJS free plan allows **200 emails/month**
- Your public key is safe to expose in frontend code
- EmailJS handles rate limiting and spam protection
- No backend server required!

## 🎨 Template Customization (Optional)

You can customize the email template in EmailJS dashboard:

**Professional Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .footer { margin-top: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Portfolio Contact: {{subject}}</h2>
    </div>
    <div class="content">
      <p><strong>From:</strong> {{from_name}}</p>
      <p><strong>Email:</strong> {{from_email}}</p>
      <p><strong>Subject:</strong> {{subject}}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>{{message}}</p>
    </div>
    <div class="footer">
      <p>Sent from your portfolio website contact form</p>
    </div>
  </div>
</body>
</html>
```

## 🚨 Troubleshooting

**Emails not sending?**
- Check your EmailJS dashboard for error logs
- Verify Service ID, Template ID, and Public Key are correct
- Check spam folder
- Ensure Gmail service is properly connected
- Verify you haven't exceeded free tier limit (200/month)

**Getting CORS errors?**
- Make sure your domain is allowed in EmailJS settings
- For localhost, it should work by default

## 📊 Monitor Usage

- Go to EmailJS dashboard to see email statistics
- Track sent emails and delivery status
- Upgrade to paid plan if you need more than 200 emails/month

## 🎯 Quick Reference

**Current Configuration Location:**
- File: `/src/pages/Contact.tsx`
- Lines: 32-34 (serviceId, templateId, publicKey)

**Receiving Email:**
- `adeoluwafisayomi@gmail.com`

**Free Tier Limits:**
- 200 emails per month
- 2 email services
- Unlimited templates

---

**Need Help?** Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
