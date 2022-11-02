# Simple Slack


### Requirements:
```
- Login with Slack (via oauth consent screen)
- Connect to a channel
- Send/receive message to/from channel
```

<br />

### CSR/SSR/SSG
There are 2 pages:
```
- login page "Connect with Slack" (SSG)
- channel page (CSR)
```
The channel page is in CSR instead of SSR, because this is a private/applicative page where SEO is not necessary.

<br />

### Oauth
The client oauth with slack is straighforward and does not require any backend server
for receiving / storing the token on behalf of the slack user.
```
-- Details oauth steps --
```