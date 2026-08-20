# KisanSangam Admin

Interactive desktop administration portal built from the KisanSangam Figma designs and FigJam navigation map.

## Local development

```bash
npm install
npm run dev
```

The mock login accepts any valid email and a password of at least six characters. All workflow changes persist in browser storage under `kisansangam-admin:v1`.

## Validation

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```
