import localFont from 'next/font/local'
//path:'../public/fonts/YekanBakh-Bold.woff2',

export const yekan=localFont({
    src:[
        {
            path:'../public/fonts/YekanBakh-Fat.woff2',
            weight:'600',
            style: "normal" 
        },
        {
            path:'../public/fonts/YekanBakh-Heavy.woff2',
            weight:'500',
            style: "normal" 
        },
        {
            path:'../public/fonts/YekanBakh-Bold.woff2',
            weight:'400',
            style: "normal" 
        },
        {
            path:'../public/fonts/YekanBakh-Regular.woff2',
            weight:'300',
            style: "normal" 
        },
        {
            path:'../public/fonts/YekanBakh-Light.woff2',
            weight:'100',
            style: "normal" 
        },
      
    ]
})
 