# Event management App 
Event management application where users can sign up and sign in, view, create, update and delete events.

## Prerequisites
- Install nodejs v16 or higher
- Install npm
- Install AWS CLI
- Install AWS Amplify CLI

## Instalation
```bash
git clone https://github.com/Mkaren92/event-management.git
```

```bash
cd event-management
```

```bash
### Only if working with new AWS console(first run)
aws configure
amplify env remove dev (this is required if you gonna use dev for env, otherwise just make sure to use unique name for env)
amplify init
```

```bash
amplify push
```

```bash
npm install
```

```bash
npm run dev
```
