import { Button, Box, styled, ButtonGroup } from "@mui/material"



const Component = styled (ButtonGroup)`
    margin-top: 30px;

`
const StyledButton = styled(Button)`
    border-radius: 50%;
`
export const ButtonGroups = ()=> {
    return (
        <Component>
            <StyledButton>-</StyledButton>
            <Button>1</Button>
            <StyledButton>+</StyledButton>
        </Component>
    )
}