# Telegram Bot & Mini App Setup Guide

## Step 1: Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Start a chat with BotFather
3. Send `/newbot` command
4. Choose a name for your bot (e.g., "Sunbeam Bot")
5. Choose a username for your bot (must end with 'bot', e.g., "sunbeam_bot")
6. Save the bot token (you'll need this later)

## Step 2: Create a Mini App

1. In the same chat with BotFather, send `/newapp`
2. Select your bot from the list
3. Choose a title for your Mini App (e.g., "Sunbeam")
4. Choose a short description (e.g., "Order fresh fish and seafood")
5. Upload an app icon (512x512 PNG)
6. Choose a username for your Mini App (e.g., "sunbeam")
7. For the app URL, use your deployed website URL (e.g., `https://your-app.vercel.app`)

## Step 3: Deploy Your App

### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically
5. Copy the deployment URL

### Option B: Deploy to Netlify

1. Build your app: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `out` folder
4. Copy the deployment URL

## Step 4: Update Mini App URL

1. Go back to BotFather
2. Send `/myapps`
3. Select your Mini App
4. Choose "Edit App"
5. Update the app URL with your deployed URL
6. Save changes

## Step 5: Test Your Mini App

1. Open your bot in Telegram
2. Send `/start`
3. You should see a button for your Mini App
4. Click the button to open your app

## Bot Commands

Add these commands to your bot using BotFather's `/setcommands`:

```
start - Start the Sunbeam Mini App
menu - View our fresh fish selection
order - Place an order
help - Get help and contact information
```

## Example Bot Response

When users send `/start`, your bot should respond with something like:

```
🐟 Welcome to Sunbeam!

We offer the freshest fish and seafood delivered to your door.

Click the button below to browse our selection and place your order!

[Sunbeam Mini App Button]
```

## Troubleshooting

### Mini App not loading
- Check that your deployment URL is accessible
- Ensure your app is built correctly
- Check browser console for errors

### Bot not responding
- Verify your bot token is correct
- Make sure your bot is not blocked
- Check bot permissions

### Styling issues in Telegram
- Test the app in different Telegram themes
- Ensure CSS variables are properly set
- Check mobile responsiveness

## Security Considerations

- Never expose your bot token in client-side code
- Use environment variables for sensitive data
- Implement proper validation for user inputs
- Add rate limiting for API calls

## Next Steps

For a production app, consider adding:

1. **Backend API** - Handle orders, payments, inventory
2. **Database** - Store products, orders, user data
3. **Payment Processing** - Integrate with payment gateways
4. **Authentication** - User accounts and order history
5. **Admin Panel** - Manage products and orders
6. **Analytics** - Track usage and sales
7. **Notifications** - Order updates via Telegram
