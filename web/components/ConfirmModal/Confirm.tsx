import { Button, Card, Text } from 'fictoan-react'
import React from 'react'
import { ConfirmModalStyled } from './Confirm.styled'

function Confirm({
    confirmMessage,closeModal,trigger
}:{
    confirmMessage:string
    closeModal: Function
    trigger: Function
}) {
    return (
        <ConfirmModalStyled
            onClick={(e)=>{
                e.stopPropagation()
                closeModal()
            }}
        >
            <Card className="confirm-card"
                padding="micro"
                marginTop="micro"
                shape="rounded"
                onClick={(e)=>{
                    e.stopPropagation()
                }}
            >
                <Text
                    size="large"
                    marginBottom="micro"
                >
                    {confirmMessage}
                </Text>
                <Button kind="secondary" 
                    onClick={()=>{
                        closeModal()
                        trigger()
                    }}
                >
                    Yes
                </Button>
                <Button kind="secondary"
                    marginLeft="micro"
                    onClick={()=>closeModal()}
                >
                    Cancel
                </Button>
            </Card>
        </ConfirmModalStyled>
    )
}

export default Confirm
