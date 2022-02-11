import { Button, Card, Text } from 'fictoan-react'
import React from 'react'
import Link from "next/link"
import Router from "next/router"

type route = "private"|"public"|"generic"

function Error({errorMessage,routeType}:{errorMessage:string,routeType: route}) {

    const reloadPage=()=>{
        Router.reload()
    }
    return (
        <Card marginTop="small"
            style={{textAlign:"center"}}
            borderColour="red-70"
            bgColour="red-30"
            shape="rounded"
            padding="micro"
        >
            <Text weight="600" size="medium" marginBottom="micro">
                {errorMessage|| "Something went wrong.Please try again"}
            </Text>
            {
                routeType!=="generic" && (
                    <Button
                        shape="rounded"
                        bgColour="grey-70"
                        shadow="mild"
                        onClick={reloadPage}
                    >
                        Retry
                    </Button>
                )
            }
            {
                routeType === "private" && (
                    <Link href="/" passHref>
                        <Button
                            shape="rounded"
                            bgColour="green-70"
                            marginLeft="micro"
                            shadow="mild"
                        >
                            Home
                        </Button>
                    </Link>
                )
            }
        </Card>
    )
}

export default Error
