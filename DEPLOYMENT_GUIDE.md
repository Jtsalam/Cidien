# Cidien.ca Deployment Guide
## Vercel + Cloudflare + Flask Mobile App

This guide covers deploying your Next.js app to Vercel at `cidien.ca` and your Flask mobile charting app at `cidien.ca/mobile`.

---

## **Architecture Overview**

- **Main App (Next.js)**: Deployed on Vercel → `cidien.ca`
- **Mobile App (Flask)**: Deployed on VPS → `cidien.ca/mobile` (proxied via Vercel rewrites)
- **Domain**: Managed through Cloudflare
- **Database**: PostgreSQL on VPS or managed service

---

## **Part 1: Domain Setup on Cloudflare**

### Step 1.1: Purchase Domain
1. Go to [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
2. Search for and purchase `cidien.ca`
3. Domain will be automatically added to your Cloudflare account

### Step 1.2: Configure DNS (Initial Setup)
1. Go to Cloudflare Dashboard → Your domain → DNS
2. Add DNS records (we'll update these later):
   - **A Record**: `@` → `192.0.2.1` (placeholder - will update with VPS IP)
   - **CNAME Record**: `www` → `cidien.ca`
3. Keep Cloudflare proxy enabled (orange cloud icon) for both records

---

## **Part 2: Deploy Next.js App to Vercel**

### Step 2.1: Prepare Your Repository
```bash
# In your local project root (C:\xampp\htdocs\Cidien)
# Create .gitignore if not exists
echo "node_modules/
.next/
.env
.env.local
*.log
.DS_Store
Charting-Device/uploads/
Charting-Device/__pycache__/
uploads/
__pycache__/
lib/generated/prisma/*.node
lib/generated/prisma/*.tmp*" > .gitignore

# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Push to GitHub/GitLab/Bitbucket
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2.2: Set Up Vercel Project
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 2.3: Configure Environment Variables
In Vercel project settings → Environment Variables, add:

```env
# Database (use your VPS PostgreSQL or Vercel Postgres)
DATABASE_URL=postgresql://user:password@host:5432/medicalcentersdb

# Node Environment
NODE_ENV=production

# Flask API URL (your VPS IP or domain)
NEXT_PUBLIC_FLASK_API_URL=https://api.cidien.ca

# Any other secrets from your .env file
```

### Step 2.4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Note your deployment URL (e.g., `cidien-xyz.vercel.app`)

---

## **Part 3: Set Up VPS for Flask App**

### Step 3.1: Choose VPS Provider
**Recommended Options:**
- **DigitalOcean**: Droplet ($6/month for 1GB RAM)
- **Linode**: Nanode ($5/month)
- **Vultr**: Cloud Compute ($6/month)
- **AWS Lightsail**: $3.50-$5/month

**Minimum Requirements:**
- 1GB RAM
- 1 CPU core
- 25GB storage
- Ubuntu 22.04 LTS

### Step 3.2: Initial Server Setup
```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Update system
apt update && apt upgrade -y

# Create non-root user
adduser cidien
usermod -aG sudo cidien
su - cidien

# Install required packages
sudo apt install -y python3.11 python3.11-venv python3-pip postgresql postgresql-contrib nginx certbot python3-certbot-nginx git curl
```

### Step 3.3: Set Up PostgreSQL Database
```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE medicalcentersdb;
CREATE USER cidien_user WITH PASSWORD 'YOUR_SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE medicalcentersdb TO cidien_user;
ALTER DATABASE medicalcentersdb OWNER TO cidien_user;
\q
```

### Step 3.4: Import Your Database Schema
```bash
# Upload your SQL file to VPS (from local machine)
scp C:\xampp\htdocs\Cidien\medicalcentersdb.sql cidien@YOUR_VPS_IP:/home/cidien/

# On VPS, import the database
sudo -u postgres psql medicalcentersdb < /home/cidien/medicalcentersdb.sql
```

---

## **Part 4: Deploy Flask Mobile App to VPS**

### Step 4.1: Upload Flask Application
```bash
# On VPS, create application directory
sudo mkdir -p /var/www/cidien-mobile
sudo chown -R cidien:cidien /var/www/cidien-mobile

# From local machine, upload Charting-Device folder
# Option 1: Using SCP
scp -r "C:\xampp\htdocs\Cidien\Charting-Device\*" cidien@YOUR_VPS_IP:/var/www/cidien-mobile/

# Option 2: Using Git (recommended)
# First, create a separate repo for Charting-Device
cd "C:\xampp\htdocs\Cidien\Charting-Device"
git init
git add .
git commit -m "Initial Flask app"
git remote add origin YOUR_FLASK_REPO_URL
git push -u origin main

# Then on VPS:
cd /var/www/cidien-mobile
git clone YOUR_FLASK_REPO_URL .
```

### Step 4.2: Create Python Virtual Environment
```bash
cd /var/www/cidien-mobile
python3.11 -m venv venv
source venv/bin/activate

# Create requirements.txt
cat > requirements.txt << EOF
flask==3.0.0
flask-socketio==5.3.5
flask-cors==4.0.0
psycopg2-binary==2.9.9
reportlab==4.0.7
python-engineio==4.8.0
python-socketio==5.10.0
gunicorn==21.2.0
gevent==23.9.1
gevent-websocket==0.10.1
EOF

# Install dependencies
pip install -r requirements.txt
```

### Step 4.3: Configure Flask for Production
Create a new file for production configuration:

```bash
nano /var/www/cidien-mobile/wsgi.py
```

Add this content:

```python
#!/usr/bin/env python3
import os
import sys

# Add the application directory to path
sys.path.insert(0, '/var/www/cidien-mobile')

from remote import app, socketio

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=False)
```

### Step 4.4: Update Database Connection
```bash
nano /var/www/cidien-mobile/remote.py
```

Update the database connection section (around line 42):

```python
# Replace with production credentials
conn = psycopg2.connect(
    dbname="medicalcentersdb",
    user="cidien_user",
    password="YOUR_SECURE_PASSWORD",
    host="localhost",
    port="5432"
)
```

### Step 4.5: Create Systemd Service
```bash
sudo nano /etc/systemd/system/cidien-mobile.service
```

Add this configuration:

```ini
[Unit]
Description=Cidien Mobile Flask Application
After=network.target

[Service]
Type=simple
User=cidien
WorkingDirectory=/var/www/cidien-mobile
Environment="PATH=/var/www/cidien-mobile/venv/bin"
ExecStart=/var/www/cidien-mobile/venv/bin/python wsgi.py
Restart=always
RestartSec=10
StandardOutput=append:/var/log/cidien-mobile.log
StandardError=append:/var/log/cidien-mobile.error.log

[Install]
WantedBy=multi-user.target
```

### Step 4.6: Create Upload Directories
```bash
cd /var/www/cidien-mobile
mkdir -p uploads/Audio/{SGH,HGH,NCI,EHI,NMC,Unassigned}
mkdir -p uploads/PDFs/{SGH,HGH,NCI,EHI,NMC,Unassigned}
mkdir -p uploads/room_aud
mkdir -p uploads/Unassigned
chmod -R 755 uploads/
```

### Step 4.7: Start Flask Application
```bash
# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable cidien-mobile
sudo systemctl start cidien-mobile

# Check status
sudo systemctl status cidien-mobile

# View logs
sudo journalctl -u cidien-mobile -f
```

---

## **Part 5: Configure Nginx on VPS**

### Step 5.1: Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/cidien-mobile
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name api.cidien.ca;

    # Increase timeouts for long-running transcriptions
    proxy_connect_timeout 600s;
    proxy_send_timeout 600s;
    proxy_read_timeout 600s;
    send_timeout 600s;

    # Flask application
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }

    # WebSocket support for SocketIO
    location /socket.io {
        proxy_pass http://127.0.0.1:5000/socket.io;
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files
    location /static {
        alias /var/www/cidien-mobile/static;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Uploaded files
    location /uploads {
        alias /var/www/cidien-mobile/uploads;
        expires 7d;
    }

    # Audio files
    location /audio {
        alias /var/www/cidien-mobile/uploads/Audio;
        expires 7d;
    }

    client_max_body_size 100M;
}
```

### Step 5.2: Enable Site and Restart Nginx
```bash
sudo ln -s /etc/nginx/sites-available/cidien-mobile /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5.3: Configure Firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

### Step 5.4: Install SSL Certificate
```bash
# Install certbot if not already installed
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate for api subdomain
sudo certbot --nginx -d api.cidien.ca

# Certbot will automatically configure HTTPS and set up auto-renewal
```

---

## **Part 6: Configure Cloudflare DNS**

### Step 6.1: Add DNS Records
Go to Cloudflare Dashboard → Your domain → DNS → Records

Add these records:

1. **For Vercel (Main App)**
   - **Type**: CNAME
   - **Name**: `@` (or root)
   - **Target**: `cname.vercel-dns.com`
   - **Proxy Status**: ⚠️ DNS Only (gray cloud)
   - **TTL**: Auto

2. **For Vercel (www subdomain)**
   - **Type**: CNAME
   - **Name**: `www`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy Status**: DNS Only (gray cloud)
   - **TTL**: Auto

3. **For Flask API (VPS)**
   - **Type**: A
   - **Name**: `api`
   - **IPv4 Address**: `YOUR_VPS_IP`
   - **Proxy Status**: ✅ Proxied (orange cloud)
   - **TTL**: Auto

### Step 6.2: Configure SSL/TLS Settings
1. Go to SSL/TLS → Overview
2. Set encryption mode to **"Full (strict)"**
3. Go to SSL/TLS → Edge Certificates
4. Enable:
   - ✅ Always Use HTTPS
   - ✅ Automatic HTTPS Rewrites
   - ✅ Minimum TLS Version: 1.2

---

## **Part 7: Connect Domain to Vercel**

### Step 7.1: Add Domain in Vercel
1. Go to your Vercel project
2. Settings → Domains
3. Add domain: `cidien.ca`
4. Add domain: `www.cidien.ca`
5. Vercel will show DNS configuration (already done in Cloudflare)

### Step 7.2: Verify Domain
1. Wait 5-10 minutes for DNS propagation
2. Vercel will automatically verify the domain
3. Once verified, both domains will show as "Valid Configuration"

---

## **Part 8: Configure Vercel Rewrites for /mobile**

### Step 8.1: Update next.config.ts
Edit your `next.config.ts` file:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mobile/:path*',
        destination: 'https://api.cidien.ca/:path*',
      },
    ];
  },
  // Allow external images from your API
  images: {
    domains: ['api.cidien.ca'],
  },
};

export default nextConfig;
```

### Step 8.2: Deploy Updated Configuration
```bash
# Commit and push changes
git add next.config.ts
git commit -m "Add mobile app proxy configuration"
git push origin main

# Vercel will automatically redeploy
```

---

## **Part 9: Update Flask App for Subdirectory Access**

### Step 9.1: Update CORS Configuration
Edit `/var/www/cidien-mobile/remote.py`:

```python
# Update CORS configuration (around line 18)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://cidien.ca",
            "https://www.cidien.ca",
            "https://api.cidien.ca",
            "http://localhost:3000"  # for development
        ],
        "supports_credentials": True
    }
})
```

### Step 9.2: Update SocketIO CORS
```python
# Update SocketIO configuration (around line 19)
socketio = SocketIO(app, 
    cors_allowed_origins=[
        "https://cidien.ca",
        "https://www.cidien.ca",
        "https://api.cidien.ca",
        "http://localhost:3000"
    ],
    logger=True, 
    engineio_logger=True
)
```

### Step 9.3: Restart Flask Application
```bash
sudo systemctl restart cidien-mobile
sudo systemctl status cidien-mobile
```

---

## **Part 10: Testing Your Deployment**

### Step 10.1: Test Main App
1. Visit `https://cidien.ca` - should load Next.js app
2. Check browser console for errors
3. Test navigation and functionality

### Step 10.2: Test Flask Mobile App
1. Visit `https://cidien.ca/mobile` - should load Flask login page
2. Test login functionality
3. Test audio recording features
4. Check browser console for WebSocket connection

### Step 10.3: Test API Directly
1. Visit `https://api.cidien.ca` - should load Flask login page
2. Verify HTTPS is working (green padlock)

### Step 10.4: Test WebSocket Connection
Open browser console on `https://cidien.ca/mobile` and check for:
```
Client connected to WebSocket
```

---

## **Part 11: Database Configuration Options**

### Option A: Use PostgreSQL on VPS (Current Setup)
✅ Already configured in Part 3
- Cost: Included with VPS
- Maintenance: You manage backups
- Performance: Good for small-medium apps

### Option B: Use Vercel Postgres (Recommended)
1. Go to Vercel → Storage → Create Database → Postgres
2. Note the connection string
3. Update `DATABASE_URL` in Vercel environment variables
4. Update Flask `remote.py` database connection
5. Import your schema to Vercel Postgres

**Benefits:**
- Managed backups
- Automatic scaling
- Better reliability
- Free tier available (256MB storage)

### Option C: Use External Managed Database
**Options:**
- **Supabase** (Free tier: 500MB)
- **Railway** (Free tier: 1GB)
- **Neon** (Free tier: 3GB)
- **Amazon RDS** (Paid)

---

## **Part 12: Monitoring & Maintenance**

### Monitoring Commands

#### Check Vercel Deployment Status
```bash
# Install Vercel CLI
npm i -g vercel

# Login and check deployments
vercel login
vercel ls
```

#### Check Flask App Status on VPS
```bash
# SSH into VPS
ssh cidien@YOUR_VPS_IP

# Check service status
sudo systemctl status cidien-mobile

# View real-time logs
sudo journalctl -u cidien-mobile -f

# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Backup Procedures

#### Database Backup (VPS)
```bash
# Create backup script
nano /home/cidien/backup-db.sh
```

Add this content:
```bash
#!/bin/bash
BACKUP_DIR="/home/cidien/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump medicalcentersdb > $BACKUP_DIR/db_backup_$DATE.sql
# Keep only last 7 backups
ls -t $BACKUP_DIR/db_backup_*.sql | tail -n +8 | xargs rm -f
```

```bash
# Make executable
chmod +x /home/cidien/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add this line:
0 2 * * * /home/cidien/backup-db.sh
```

#### Uploaded Files Backup
```bash
# Backup uploads directory
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz /var/www/cidien-mobile/uploads/

# Or use rsync to another server
rsync -avz /var/www/cidien-mobile/uploads/ user@backup-server:/backups/cidien-uploads/
```

---

## **Part 13: Update & Deployment Workflow**

### Updating Next.js App (Vercel)
```bash
# On your local machine
cd C:\xampp\htdocs\Cidien

# Make your changes
# Commit and push
git add .
git commit -m "Your update message"
git push origin main

# Vercel automatically deploys
```

### Updating Flask App (VPS)
```bash
# If using Git
ssh cidien@YOUR_VPS_IP
cd /var/www/cidien-mobile
git pull origin main
sudo systemctl restart cidien-mobile

# If uploading files manually
# From local machine:
scp remote.py cidien@YOUR_VPS_IP:/var/www/cidien-mobile/
# Then SSH and restart
ssh cidien@YOUR_VPS_IP
sudo systemctl restart cidien-mobile
```

---

## **Part 14: Troubleshooting Guide**

### Issue 1: Domain Not Connecting to Vercel
**Symptoms**: ERR_NAME_NOT_RESOLVED or 404
**Solutions**:
- Wait 10-20 minutes for DNS propagation
- Check Cloudflare DNS records are "DNS Only" (gray cloud) for Vercel
- Verify CNAME points to `cname.vercel-dns.com`
- Run `nslookup cidien.ca` to check DNS resolution

### Issue 2: /mobile Returns 404
**Symptoms**: `https://cidien.ca/mobile` shows 404
**Solutions**:
- Verify `next.config.ts` has correct rewrites
- Check Vercel deployment logs
- Ensure Flask app is running: `sudo systemctl status cidien-mobile`
- Test direct access: `https://api.cidien.ca`

### Issue 3: WebSocket Not Connecting
**Symptoms**: "WebSocket connection failed" in console
**Solutions**:
- Check CORS settings in Flask app
- Verify Nginx WebSocket proxy configuration
- Test direct connection to `wss://api.cidien.ca/socket.io`
- Check browser console for specific error messages

### Issue 4: Database Connection Failed
**Symptoms**: 500 errors, "could not connect to database"
**Solutions**:
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check credentials in `remote.py`
- Test connection: `psql -U cidien_user -d medicalcentersdb -h localhost`
- Check PostgreSQL logs: `sudo tail -f /var/log/postgresql/postgresql-*.log`

### Issue 5: File Upload Fails
**Symptoms**: "No audio file found", upload errors
**Solutions**:
- Check upload directory permissions: `ls -la /var/www/cidien-mobile/uploads/`
- Verify disk space: `df -h`
- Check Nginx `client_max_body_size` setting
- Review Flask logs: `sudo journalctl -u cidien-mobile -n 50`

### Issue 6: SSL Certificate Issues
**Symptoms**: "Not secure" warning, SSL errors
**Solutions**:
- Renew certificate: `sudo certbot renew`
- Check certificate status: `sudo certbot certificates`
- Verify Cloudflare SSL mode is "Full (strict)"
- Check Nginx SSL configuration

---

## **Part 15: Security Best Practices**

### 15.1 Secure Environment Variables
- ✅ Never commit `.env` files
- ✅ Use Vercel environment variables for secrets
- ✅ Use strong database passwords
- ✅ Rotate secrets regularly

### 15.2 VPS Security
```bash
# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd

# Install fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Keep system updated
sudo apt update && sudo apt upgrade -y
```

### 15.3 Cloudflare Security
1. Enable "Under Attack Mode" if experiencing DDoS
2. Set up firewall rules to block bad actors
3. Enable Bot Fight Mode
4. Set up rate limiting for API endpoints

### 15.4 Application Security
- Update Flask secret key in `remote.py`
- Implement rate limiting on Flask endpoints
- Sanitize user inputs
- Keep dependencies updated

---

## **Part 16: Performance Optimization**

### 16.1 Vercel Optimizations
- Enable Vercel Analytics (free)
- Use Next.js Image optimization
- Implement proper caching headers
- Use dynamic imports for large components

### 16.2 Flask Optimizations
```python
# Add to remote.py for production
from flask_compress import Compress
Compress(app)

# Add response caching for static endpoints
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
```

### 16.3 Database Optimizations
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_bed_assigned_nurse ON bed_info(assigned_nurse_id);
CREATE INDEX idx_room_data_bed ON room_data(bed_id);
CREATE INDEX idx_room_data_approved ON room_data(is_approved);
```

### 16.4 Cloudflare Optimizations
1. Enable Auto Minify (CSS, JavaScript, HTML)
2. Enable Brotli compression
3. Set up caching rules
4. Enable HTTP/2 and HTTP/3

---

## **Quick Reference: All URLs**

| Service | URL | Purpose |
|---------|-----|---------|
| Main App | `https://cidien.ca` | Next.js application |
| Main App (www) | `https://www.cidien.ca` | Redirect to main |
| Mobile App (proxy) | `https://cidien.ca/mobile` | Flask app via Vercel rewrite |
| API Direct | `https://api.cidien.ca` | Direct Flask API access |
| Vercel Dashboard | `https://vercel.com/dashboard` | Manage deployments |
| Cloudflare Dashboard | `https://dash.cloudflare.com` | Manage DNS & CDN |

---

## **Cost Breakdown (Monthly)**

| Service | Cost | Notes |
|---------|------|-------|
| Cloudflare Domain | ~$13/year CAD | .ca domain registration |
| Vercel Hosting | $0 | Free hobby plan (sufficient) |
| VPS (DigitalOcean) | $6-12 USD | 1-2GB RAM droplet |
| SSL Certificates | $0 | Free via Let's Encrypt |
| **Total Monthly** | **~$7-12 USD** | Plus domain annual fee |

### Upgrade Options:
- **Vercel Pro** ($20/month): Remove branding, more bandwidth
- **Larger VPS** ($18-24/month): More RAM for scaling
- **Managed Database** ($10-20/month): Automated backups & scaling

---

## **Support & Resources**

### Documentation Links
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Flask Docs](https://flask.palletsprojects.com/)
- [Cloudflare Docs](https://developers.cloudflare.com/)
- [Nginx Docs](https://nginx.org/en/docs/)

### Useful Commands Cheat Sheet
```bash
# Vercel
vercel login
vercel --prod  # Deploy to production
vercel logs    # View logs

# VPS Service Management
sudo systemctl status cidien-mobile
sudo systemctl restart cidien-mobile
sudo journalctl -u cidien-mobile -f

# Nginx
sudo nginx -t                    # Test configuration
sudo systemctl restart nginx      # Restart Nginx
sudo tail -f /var/log/nginx/error.log

# Database
sudo -u postgres psql medicalcentersdb
sudo systemctl restart postgresql

# SSL
sudo certbot renew
sudo certbot certificates
```

---

## **Next Steps After Deployment**

1. ✅ Test all functionality on production
2. ✅ Set up monitoring (Vercel Analytics, Uptime Robot)
3. ✅ Configure automated backups
4. ✅ Set up custom error pages
5. ✅ Implement analytics (Google Analytics, Plausible)
6. ✅ Test mobile responsiveness
7. ✅ Perform security audit
8. ✅ Document admin procedures
9. ✅ Set up staging environment (optional)
10. ✅ Create disaster recovery plan

---

## **Emergency Contacts & Rollback**

### Rollback Vercel Deployment
```bash
# View deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Rollback Flask App
```bash
# If using Git
cd /var/www/cidien-mobile
git log --oneline
git checkout [previous-commit-hash]
sudo systemctl restart cidien-mobile
```

### Emergency Database Restore
```bash
# Restore from backup
sudo -u postgres psql medicalcentersdb < /home/cidien/backups/db_backup_YYYYMMDD_HHMMSS.sql
```

---

## **Conclusion**

Your application is now deployed with:
- ✅ Next.js app on Vercel at `cidien.ca`
- ✅ Flask mobile app accessible at `cidien.ca/mobile`
- ✅ Cloudflare managing DNS and CDN
- ✅ SSL certificates for secure connections
- ✅ Automated deployments via Git
- ✅ Production-ready database setup
- ✅ Monitoring and backup systems

**Important**: Replace all placeholder values (YOUR_VPS_IP, YOUR_SECURE_PASSWORD, etc.) with your actual credentials before deploying.

---

**Last Updated**: November 2025  
**Maintainer**: Cidien Development Team  
**Version**: 1.0.0

