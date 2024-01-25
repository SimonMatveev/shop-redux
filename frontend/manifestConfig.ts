import { VitePWAOptions } from "vite-plugin-pwa";

export const manifestForPlugin: Partial<VitePWAOptions> = {
registerType:'prompt',
includeAssets:['favicon.ico','apple-touch-icon','mask-icon.svg'],
srcDir:'src',
devOptions: {
  enabled:true
},
manifest: {
  name: 'Shop.com',
  short_name: 'Shop',
  description: 'Shop for games.',
  theme_color:'#171717',
  display:'standalone',
  scope:'/',
  start_url:'/',
  orientation:'portrait',
  icons: [
    {
      src:'pwa-64x64.png',
      sizes:'64x64',
      type:'image/png'
    },
    {
      src:'pwa-192x192.png',
      sizes:'192x192',
      type:'image/png'
    },
    {
      src:'pwa-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose: 'any'
    },
    {
      src:'maskable-icon-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'maskable'
    }
  ]
}

}