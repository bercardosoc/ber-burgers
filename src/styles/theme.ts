import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react"

export const theme = extendTheme({

    colors: {
        orange: {
            500: "#EF832A",
            100: "rgba(239, 131, 42, 0.2)"
        },
        yellow: {
            100: "rgba(255, 191, 0, 0.5)",
            500: "#FFF600",
            600: "#ffbf00",
        },
        gray: {
            500: "#D3D3D3",
            600: "#BDBDBD"
        }
    }
})