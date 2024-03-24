import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    channel: {
      sms: {
        bg: "#EDF6E9",
        text: "#038547",
      },
      lms: {
        bg: "#FFF1E3",
        text: "#F47500",
      },
      mms: {
        bg: "#F3EFFF",
        text: "#9C25B0",
      },
      kkt: {
        bg: "#FFF2C3",
        text: "#572626",
      },
    },
    gray: {
      100: "#F7F8F9",
      200: "#F4F4F4",
      300: "#EBEBEB",
      400: "#DDE0E3",
      500: "#C4CAD0",
      600: "#ACB4BE",
      700: "#808893",
      800: "#6E7175",
      900: "#525252",
    },
    primary: {
      100: "#eae9f2",
      200: "#c0bfd8",
      300: "#8280b2",
      400: "#6e6ba5",
      500: "#595698",
      600: "#44418b",
      700: "#302C7F",
      800: "#302c7f",
      900: "#2b2772",
      1000: "#1f1b5e",
      1100: "#1b1757",
    },
    red: {
      light: "#FFF4F4",
      badge: "#FF3B30",
      500: "#EE2F24",
    },
  },
  components: {
    Accordion: {
      baseStyle: {
        root: {
          backgroundColor: "white",
          borderRadius: 5,
          borderColor: "gray.300",
          borderWidth: "1px",
        },
        container: {
          ":first-of-type": {
            borderTopWidth: 0,
          },
          ":last-of-type": {
            borderBottomWidth: 0,
          },
        },
        panel: {
          borderColor: "gray.300",
          borderTopWidth: "1px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "auto",
        },
      },
    },
    Badge: {
      baseStyle: {
        alignItems: "center",
        borderRadius: "lg",
        display: "inline-flex",
        fontSize: "0.75rem",
        fontWeight: "700",
        justifyContent: "center",
        px: "0.5rem",
        py: "0.125rem",
      },
      sizes: {
        lg: {
          p: 2.5,
          borderRadius: "xl",
        },
      },
      variants: {
        primaryBlue: {
          backgroundColor: "primary.700",
          color: "white",
        },
        ghostBlue: {
          bgColor: "primary.200",
          color: "primary.700",
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "0.75rem",
        fontWeight: "500",
        _disabled: {
          opacity: 1,
        },
        ".chakra-button__icon": {
          mr: 1,
        },
      },
      sizes: {
        xs: { fontSize: "13px", height: "24px", px: 3, py: 1 },
        sm: { fontSize: "13px", height: "34px", px: 4, py: 1 },
        md: { fontSize: "14px", height: "38px", px: 5, py: 2 },
        lg: { fontSize: "16px", height: "48px", px: 5, py: 2 },
      },
      variants: {
        primaryBlue: {
          backgroundColor: "primary.700",
          color: "white",
          _disabled: {
            backgroundColor: "primary.400 !important",
          },
          _active: { backgroundColor: "primary.900" },
          _hover: { backgroundColor: "primary.900" },
        },
        primaryGray: {
          backgroundColor: "gray.700",
          color: "white",
          _disabled: {
            backgroundColor: "gray.400",
            color: "gray.600",
          },
          _active: { backgroundColor: "gray.800" },
          _hover: { backgroundColor: "gray.800" },
        },
        ghostBlue: {
          backgroundColor: "primary.200",
          color: "primary.700",
          _disabled: {
            backgroundColor: "gray.300",
            color: "gray.600",
          },
          _active: { backgroundColor: "primary.300" },
          _hover: {
            backgroundColor: "primary.300",
          },
        },
        ghostGray: {
          backgroundColor: "gray.200",
          borderColor: "gray.400",
          borderWidth: "1px",
          color: "gray.800",
          _disabled: {
            backgroundColor: "gray.200",
            color: "gray.600",
          },
          _active: {},
          _hover: {},
        },
        secondaryBlue: {
          backgroundColor: "white",
          borderWidth: "1px",
          borderColor: "primary.700",
          color: "primary.700",
          _disabled: {
            borderColor: "primary.400",
            color: "primary.400",
          },
          _active: { backgroundColor: "primary.200" },
          _hover: { backgroundColor: "primary.200" },
        },
        secondaryGray: {
          backgroundColor: "white",
          borderWidth: "1px",
          borderColor: "gray.800",
          color: "gray.800",
          _active: { backgroundColor: "gray.200" },
          _hover: { backgroundColor: "gray.200" },
          _disabled: {
            backgroundColor: "gray.200",
            borderColor: "gray.400",
            color: "gray.600",
          },
        },
        textGray: {
          backgroundColor: "white",
          borderWidth: "1px",
          borderColor: "gray.400",
          color: "gray.800",
          _disabled: {
            borderColor: "gray.400",
            color: "gray.500",
          },
          _active: { backgroundColor: "gray.100", color: "gray.900" },
          _hover: { backgroundColor: "gray.100", color: "gray.900" },
        },
        secondaryGreen: {
          backgroundColor: "white",
          borderWidth: "1px",
          borderColor: "#206F44",
          color: "#206F44",
          _disabled: {
            borderColor: "gray.500",
            color: "gray.500",
          },
        },
        error: {
          backgroundColor: "white",
          borderWidth: "1px",
          borderColor: "red.500",
          color: "red.500",
          _disabled: {
            borderColor: "red.bg",
            color: "red.bg",
          },
        },
        transparent: {
          color: "primary.700",
          background: "transparent",
        },
        link: {
          color: "gray.900",
          textDecoration: "underline",
        },
        text: {
          background: "transparent",
          color: "gray.800",
          fontWeight: "400",
          padding: 0,
          height: "auto",
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "gray.600",
          borderRadius: "0.25rem",
          borderWidth: "1px",
          _checked: {
            backgroundColor: "primary.700",
            borderColor: "primary.700",
          },
          _disabled: {
            bgColor: "gray.200",
            borderColor: "gray.400",
          },
        },
        label: {
          marginLeft: "0.25rem",
        },
      },
      sizes: {
        md: { label: { fontSize: "var(--chakra-fontSizes-sm)" } },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "white",
            borderColor: "gray.400",
            borderRadius: "xl",
            h: "34px",
            "::placeholder": {},
            _placeholder: {
              color: "gray.600",
            },
            _hover: {
              borderColor: "gray.500",
            },
            _disabled: {
              bg: "gray.200",
              color: "gray.600",
              opacity: 1,
            },
            _readOnly: {
              border: 0,
              padding: 0,
            },
          },
        },
      },
      sizes: {
        sm: {
          field: {
            height: "34px",
          },
        },
        xs: {
          field: {
            borderRadius: "xl",
            height: "var(--chakra-sizes-7)",
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          width: "100%",
          height: "100%",
        },
        dialogContainer: {
          width: "100%",
          padding: "2rem",
          "::-webkit-scrollbar-track": {
            background: "gray.800",
          },
          "::-webkit-scrollbar-corner": {
            background: "gray.800",
          },
          "::-webkit-scrollbar-thumb": {
            background: "gray.500",
            borderColor: "gray.800",
          },
        },
        dialog: {
          borderRadius: "0.75rem",
          maxHeight: "750px",
        },
        header: {
          borderBottomWidth: "1px",
          borderBottomColor: "primary.700",
          color: "primary.700",
          fontSize: "1rem",
          fontWeight: "600",
          padding: "1rem 1.25rem",
        },
        closeButton: { top: "0.75rem" },
        body: {
          padding: "1.5rem 1.25rem",
          flex: 1,
          overflow: "auto",
          "::-webkit-scrollbar-track": { background: "white" },
          "::-webkit-scrollbar-thumb": {
            borderColor: "white",
          },
        },
        footer: {
          borderTopWidth: "1px",
          borderTopColor: "gray.300",
          padding: "0.75rem 1.25rem",
        },
      },
    },
    Popover: {
      variants: {
        topBar: {
          content: {
            borderRadius: "0.75rem",
            boxShadow: "0px 4px 12px -8px rgba(106, 106, 106, 0.6)",
            overflow: "hidden",
            _focus: {
              boxShadow: "0px 4px 12px -8px rgba(106, 106, 106, 0.6)",
            },
          },
          header: {
            borderBottomColor: "gray.300",
            color: "black",
            fontWeight: "500",
            px: 5,
            py: 3.5,
          },
          closeButton: {
            top: 3.5,
            right: 4,
          },
          body: {
            p: 0,
          },
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          borderColor: "gray.600",
          borderWidth: "1px",
          _checked: {
            backgroundColor: "primary.700",
            borderColor: "primary.700",
          },
          _disabled: {
            bgColor: "gray.200",
            borderColor: "gray.400",
          },
        },
        label: {
          marginLeft: "0.25rem",
        },
      },
      sizes: {
        md: { label: { fontSize: "var(--chakra-fontSizes-sm)" } },
      },
      variants: {
        button: {
          control: {
            border: 0,
            height: 0,
            overflow: "hidden",
            width: 0,
          },
          label: {
            alignItems: "center",
            backgroundColor: "white",
            borderColor: "primary.700",
            borderRadius: "0.75rem",
            borderWidth: "1px",
            color: "primary.700",
            display: "inline-flex",
            fontWeight: "500",
            h: "34px",
            m: 0,
            px: 4,
            _checked: {
              backgroundColor: "primary.200",
              borderColor: "primary.700",
              color: "primary.700",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: "white",
            borderColor: "gray.400",
            borderRadius: "xl",
            _hover: {
              borderColor: "gray.500",
            },
          },
        },
        outline2: {
          field: {
            bg: "white",
            borderColor: "gray.400",
            borderRadius: "xl",
            borderWidth: "1px",
            _hover: {
              borderColor: "gray.500",
            },
            _disabled: {
              cursor: "text",
              border: 0,
              padding: 0,
              opacity: 1,
              "+ .chakra-select__icon-wrapper": {
                display: "none",
              },
            },
          },
        },
      },
      sizes: {
        sm: {
          field: { borderRadius: 5, h: "34px" },
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          _checked: {
            backgroundColor: "primary.700",
          },
        },
      },
    },
    Table: {
      baseStyle: {
        thead: {
          th: {
            fontSize: "14px",
            fontWeight: "500",
            textAlign: "center",
            verticalAlign: "middle",
            whiteSpace: "initial",
          },
        },
        tbody: {
          td: {
            fontSize: "14px",
            textAlign: "center",
            verticalAlign: "middle",
            whiteSpace: "initial",
          },
        },
      },
      variants: {
        simple: {
          th: {
            backgroundColor: "gray.100",
            borderColor: "gray.300",
            color: "gray.900",
            padding: "0.75rem",
          },
          td: {
            borderBottomWidth: 0,
            borderTopWidth: 1,
            borderColor: "gray.300",
            padding: "0.75rem",
          },
          tbody: {
            th: {
              borderBottomWidth: 0,
              borderTopWidth: 1,
              borderRightWidth: 1,
              fontSize: "14px",
              fontWeight: "500",
              padding: "0.75rem 1rem",
            },
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            bg: "gray.100",
            borderColor: "gray.300",
            borderTopRadius: "0.75rem",
            borderWidth: "1px",
            color: "gray.900",
            fontSize: "sm",
            fontWeight: "400",
            minWidth: "180px",
            px: "1.5rem",
            py: "0.5rem",
            _selected: {
              bg: "white",
              borderBottomColor: "white",
              borderColor: "primary.700",
              color: "primary.700",
              fontWeight: "600",
            },
          },
          tablist: {
            borderBottomWidth: "1px",
            borderBottomColor: "gray.300",
          },
          tabpanels: {
            width: "100%",
          },
          tabpanel: {
            padding: "1rem 0 0",
          },
        },
      },
    },
    Tag: {
      sizes: {
        sm: { container: { py: 1.5 } },
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: "white",
          borderColor: "gray.400",
          borderRadius: "0.75rem",
          placeholder: {
            color: "gray.600",
            opacity: 1,
          },
          _hover: {
            borderColor: "gray.500",
          },
          ":disabled, :read-only": {
            bg: "gray.200",
            color: "gray.600",
            opacity: 1,
          },
          "::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
          },
          "::-webkit-scrollbar-track": {
            background: "white",
          },
          "::-webkit-scrollbar-thumb": {
            background: "gray.600",
            border: 0,
            borderRadius: "1rem",
            width: "14px",
          },
        },
      },
    },
  },
  fonts: {
    heading: `"Pretendard", -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol", sans-serif`,
    body: `"Pretendard", -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol", sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: `"Pretendard", -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol", sans-serif`,
        color: "gray.900",
      },
      body: {
        minWidth: "1680px",
        overflowY: "hidden",
      },
      code: {
        fontFamily: `source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace`,
      },
      ".chakra-stack, .chakra-flex": {
        minW: "1px",
      },
      "::-webkit-scrollbar": {
        height: "14px",
        width: "14px",
      },
      "::-webkit-scrollbar-track": { background: "gray.200" },
      "::-webkit-scrollbar-corner": {
        background: "rgba(0,0,0,0)",
      },
      "::-webkit-scrollbar-thumb": {
        background: "gray.600",
        border: "4px solid var(--chakra-colors-gray-200)",
        borderRadius: "5rem",
        width: "14px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "gray.500",
      },
      ".sidebar-nav-link": {
        display: "block",
        borderRadius: "0.75rem",
        "&.active": {
          background: "white",
          pointerEvents: "none",
          ".chakra-text": {
            color: "primary.700",
            fontWeight: "700",
          },
        },
      },
    },
  },
});
export default theme;
