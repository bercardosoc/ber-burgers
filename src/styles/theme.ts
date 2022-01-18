import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        orange: {
            500: "#EF832A",
            100: "rgba(239, 131, 42, 0.2)"
        },
        yellow: {
            500: "#FFF600"
        },
        gray: {
            500: "#D3D3D3",
            600: "#BDBDBD"
        }
    }
})