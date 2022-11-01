import { Box, Button } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Slack</title>
        <meta name="description" content="simple slack" />
      </Head>
      <Box>
        <Button>Click me</Button>

      </Box>
    </div>
  )
}
