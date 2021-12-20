# Ethereum Todo List

## Prerequisites

- [Ganache](https://trufflesuite.com/ganache/)
- [Truffle](https://www.npmjs.com/package/truffle)
- NPM dependencies installed (here and in `/client`)

## Getting Started

### Blockchain

First, launch a local Blockchain with **Ganache**.

Then, compile the smart contract:

```bash
truffle compile
```

Deploy it on the blockchain:

```bash
truffle migrate
```

---

### Client

#### Development

Execute:
```bash
npm start
```

#### Production

Execute:
```bash
npm run build
```
