import { Button, Portion, Row, Text } from "fictoan-react";
import React from "react";
import Link from "next/link";

function Custom404() {
   return (
      <Row sidePadding="large">
         <Portion style={{ textAlign: "center" }}>
            <Text style={{ fontSize: "100px" }} margin="none">
               404
            </Text>
            <Text size="huge">Page not found</Text>
            <Link href="/" passHref>
               <Button kind="secondary">Go to Home</Button>
            </Link>
         </Portion>
      </Row>
   );
}

export default Custom404;
