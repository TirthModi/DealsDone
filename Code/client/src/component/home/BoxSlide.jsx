import { Box, Grid, styled, Typography } from "@mui/material"

const Component = styled(Grid)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20px;
    margin-top: 10px;
    margin-bottom: 10px;

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-columns: 1fr 1fr;
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        grid-template-columns: 1fr;
    }
`;


const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: auto ;
    margin-left: auto ;
    color: orange;
    text-align: center;

    
`
const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`
const TRow =styled(Box)`
    display: flex;

   
`
const IBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 50%;
    text-align: center;
    border-radius: 4px; 
    background-color: white; 
    margin: 2px
`;


const Container = styled(Box)`
    background: #fff;
     ${({ theme }) => theme.breakpoints.down('md')} {
        margin-top: 10px;
    }
    
`
const Image = styled('img')`
    width: 100px;
    height: 125px;
    padding: 10px 10px;
    object-fit: contain;


`
const BoxSlide = () => {


    const title = "Daily Groceries";
    const title1 = "Top Selling Mobiles";
    const title2 = "Newest Arrivals";
    const title3 = "Home Furnishing";
    return (
        <Component>
            <Container>
                <Deal style={{background: 'white'}}>
                    <DealText>
                            <span style={{ color: 'orange' }}>{title.split(' ')[0]}</span>{' '}
                            <span style={{ color: 'black' }}>{title.split(' ').slice(1).join(' ')}</span>
                    </DealText>
                </Deal>
                <TRow>
                    <IBox> <Image src='data:image/jpeg;base64,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' /></IBox>
                    <IBox> <Image src='data:image/jpeg;base64,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' /></IBox>
                </TRow>
                <TRow>
                    <IBox> <Image src='data:image/jpeg;base64,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' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//3eb1f569f1704860/screenshot_1733042491474.png?Expires=1733215450&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gcrqbUCbLefst9J8NN6Uz3EuoKgbEdgXWPTx-c-ugQq9GjbgIsJmHrwyy342J-fbNA175jiJK~XiYwnnxluqabhNrGG9LpypGsviPwiGuYrTVrLJzqa2ts8UWuslb3QALMQHQhghtVuFcNTZIlIxGx4WhQg2xM8QrxsIAafcqsXI9Da14~6WogWpiBIyUBDwP1sImNHUzsUQiDYUFnhGNUIlayYybhTrYioZ29uCOhs6i0be5RyVdPNwagbWCuDJpGHuQ7BobpiTi1Tgpb2bOTq92PjiRcUz-O8QVelaK0YObS1PhwGu4L2IXsfvEYFbYKc78kUoDtZqVHyHcPZwzA__' /></IBox>
                </TRow>

            </Container>

            <Container>
                <Deal style={{background: 'white'}}>
                    <DealText>
                            <span style={{ color: 'orange' }}>{title1.split(' ')[0]}</span>{' '}
                            <span style={{ color: 'black' }}>{title1.split(' ').slice(1).join(' ')}</span>
                    </DealText>
                </Deal>
                <TRow>
                    <IBox> <Image src='https://media-hosting.imagekit.io//b0632437146b4b5e/screenshot_1733045322055.png?Expires=1733218280&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1o8i2LqtPz528WQ-xzAuolZ~4o0D5PAJwUzllWdH5jmuIC1p56kYmmT0wJvElxZpawhLEeOl0lCryvK83u5iqKzsTI7RikMmqaxRn2zLmCOCeXZoQmEGyD~QrgjHjPcDACopCjiyDXzK4aTIZJM5H-DvnLeX1X4EfgjdRwtpffKUvNU1mp-N8ptBReRk5tPgs80I6aZeGWSaD5hJWHvl7xbwd~9PsgZurrWvWkxE6uaERs7cCn8IXLDIMGsecynvMjZfNMDa0GHBhyhS8nr9ryrUlWQRUnmia3tfEZHgekyThyNutUBDO-RTExvVNsLXL32JRDljOkhaAXekGda9Lg__' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//b9257c79318343df/screenshot_1733045239886.png?Expires=1733218198&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=aL6W92-vaiRSkdsasQZwtlAuoVajSBK3lXIp1mn42ZQkP7PInFoYiLvssuhJyR~JRE9U6-P4QzJUgL19COs-g9qDDP77YgfkPF6iJSETrqoVHr1~KudyAAxK6ZeEwQ1dQVCcGQuFyJWmKwvcPtHxCEvE6xeRWSIsbLvUSTMT3q21Nm3PANrRPIfGZdx~tnCXNoZmOOWawtD6LMu8ZLk2SDwtrS2JMfHWmbTkzpszr0QtioHPi65CWJnP9SiHUk7Wi3OqknUgxWQ~JXb3nsU3S6pPqhdyN-etHZGbhMa2H7hR7fU2~T7bMx4DcaBehBNT1~W6m-atO3VSAAX~GQfF4g__' /></IBox>
                </TRow>
                <TRow>
                    <IBox> <Image src='https://media-hosting.imagekit.io//dc9da4efd2eb44fe/screenshot_1733045210512.png?Expires=1733218168&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jyynowU8NcA6~sBIkcTVTuhubVHTm7V7QaWk-62X9L8CV3QSgfiiq4jfZL4lIh134Ioc5wqh~21963~aMn-pJMapAZp8QwM3~96NQ1icWrG1hfIAX7Ki7pb5a~zfBlofhzLrkSfNBgpGI0n295sUwIV~PqUdb4WGfb3n2droYHMOtLHyVQAdX9w5P4lqyJpGCrkHaswxC4DsiaLE0haJBR9UI5aJDbeVEgD4~8MMJd-rbE4XposuP5N~pjuqGDQm~Um4baG2~nLNiCRGNRM4GgjjBb2RcoVjB2JqR6gn3fptwrEbs8w25Kvhplm16iz6y50RgpRhK~~ngGwSh6CkEw__' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//19d270f81acf4337/screenshot_1733045192839.png?Expires=1733218151&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=M5kEP8GRu2yP3Gv0NjeN62AWhfd5N861orp5WMPjMapSqAW0vxsvxDml~LfSGWomsN8VPPQ9Aj4ELPgemR5EdeKJWmyZ6pySeSfSja3CDgT2R~-46HEmS0SIYQZ9E2gxWMtYduJcI4CKrr5HQWYeWf27g2NdsEcB~NRYKc5YVVieVHxrcgeQvteQtl90iim57hUnKf~OF2ISpPr38UTWXhU4I5L8R~6nmqdOZNvIh2Eaa~3P~ISXs2Uq9ZteA1Y5-v2kKgpnVjkMHTB5l7CwU5PpkH3IySdzhMxqgET8AkUalMS79aKjIn~wa-o9AiGD-GvWlacugHX40~QN6y4Kzw__' /></IBox>
                </TRow>

            </Container>
            
            <Container>
                <Deal style={{background: 'white'}}>
                    <DealText>
                            <span style={{ color: 'orange' }}>{title2.split(' ')[0]}</span>{' '}
                            <span style={{ color: 'black' }}>{title2.split(' ').slice(1).join(' ')}</span>
                    </DealText>
                </Deal>
                <TRow>
                    <IBox> <Image src='https://media-hosting.imagekit.io//2b99f789d75248fb/screenshot_1733045095657.png?Expires=1733218054&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Pcf1fkIrEQwbr4v0DrObLBD4s7Wxk2b5Wz3Jioq1zjj1YlDE8td~WGkTDVjqDcpBslAYDJ~RmgIeRww9ztENjpdjRzZ30gXWt9afL6ttAK8xOHr0FVokgvqM3dUkkT~oI5CYn3Ud5veT5uopm6Bm0dUIeTrTrFH6LoBJ3On1SC9LRnULe7OxNRqXD7jiYr55QRhGhSfZK0ZeVogEnAQENYFa5RSOPYD5hG1lYnLxtvfx2OuNKObd1zxMw2FDt28m4tZXEWP11bWTWdlOhjIu-ZMlUihzybqkteniNDkJcjdcMHoTCMRj5pQXfi6GFu4RDEK2Bk-YRiVkTDriM4ysIQ__' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//95c6b0dd26914688/screenshot_1733045045902.png?Expires=1733218004&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1wRbY9fPaUTUBEYCKMTZ7KchOtgtygdG~SQpRV4ZAPW2m2a6~lC9fKoUpNISutD9YbOZ4Yv0TJj06RY1eCPxLfBcAmdhycOXdrdHCq2eSCvIv3iydU1NOOjMye-uQjOORnb~4AXr-c6SestXnFee9~LqIar1xk7JCBskaiQ2xdXcnHOpEoR376xtkUf5lqCjoXP3ioNs4hA~~klddDPtk~AiLVMsmy3YFYDCffOgWSbH0bVNmdEGzcGpILwGUYUf6U0oTmKKVBSu89vq5gb93hfDi~TF4vdp2j0~XUD9aqoKcuybFSA5O04QLO4yFVZj8iZdBDN5H5WqBd03LC4tRw__' /></IBox>
                </TRow>
                <TRow>
                    <IBox> <Image src='https://media-hosting.imagekit.io//b61332c7131a408c/screenshot_1733006655755.png?Expires=1733179612&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OKafMoRPyE5kTmJEs4i6szkY7glHaBw8HI9B4ZCRjvwYF4x43AKcESlbthBwNRk6eHhBtl9IyXHMaAGQsuArfRUnEotC~fTBje8aKSZIsM8Pnz4ljWGa6h6zTAiZaJg5P-h9IyJ7NyT-hkwoHkmPMjb6rKGSxtcFgu9t-3qSurX~wQ6wKbFurmXvs4ChcfUwXkQvGTUs48S3NFx3jmMuzii-QD7XEayiC5Bu9IUWTZApRT0QPOeVWFC4XkIlVm~T-ZfzDhbB021NA8SKU62byghLLJC2aS714ZIs8Hw9bD91UTNv~oFxCUuZBt7lHkNblb4KaeeIFzFwIP18kU~drQ__' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//5cec4b2c93e34ba0/screenshot_1733007206455.png?Expires=1733180163&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=bSLXOZwOhPW6CKgYarTCZFp-WRlkFsP0eaAW2jtcSRfDNh2D4eS9bZchIJJ8URBDKb44ySD5J0L0iKDdYqzgQvkRNIiKmRMAcmCp7wTqgt7chfqCf3u7IYqKpnpAf7t5rwt9cMXlTyuWj-VUPl6vrl4HqDgX6ZEQH9BK-henNqIm33ZK~GX8iOce905edRTeerq96o0dUY0XR84Pyf0TosjREpQ6~Up1jSkU6iKE5c2ZjP3tteHn1kcqyyD93JvGnvgtO~eWtmaj95xpvMRhEDXEvj0gBygMl09ZIdcDel8nIHdrDP6zk~ukYi1a9iHePZYgSp6mkjYMiMnb5sWcaw__' /></IBox>
                </TRow>

            </Container>

            <Container>
                <Deal style={{background: 'white'}}>
                    <DealText>
                            <span style={{ color: 'orange' }}>{title3.split(' ')[0]}</span>{' '}
                            <span style={{ color: 'black' }}>{title3.split(' ').slice(1).join(' ')}</span>
                    </DealText>
                </Deal>
                <TRow>
                    <IBox> <Image src='https://media-hosting.imagekit.io//0053d0898acf40ec/screenshot_1733006256249.png?Expires=1733179213&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=plRc-UmYyVrFR-zkYqOXYjDVMFwNkvLbQFwzysuA5ax26LO7ciVofvbQR0XaC6ldJJZTEsQqd13jDLPhNkDiN~13YECwUIZudW9D1lYcFgrWYU5hr9-LmmlxYN5AbSUSHXqexBFTDRBmEye9Q36Bsqt5RkLBn1Fuk5G7aJiJeAiMeNcXfMhfJcBPYhpV0xJN1HsbvI~vuIYezBewJYlrlfZBjQ9fsU5xS--v7gefGCIDNj8V4Ts~ETfGZPin8kn2ptLYF33w7-J653C7ZGyuWOv-813av9PLg6kKqa2YFQi4T74vloHwTCggronuBuwQ0YUAmttSnsXIcwc9QIcGig__' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//f0caffc29a0c413a/screenshot_1733006171627.png?Expires=1733179128&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=j~kGiW~NXDU8E8mTmaa4FbAzky-ViTN3~Cx2zqfmZ97tBKt2rmatAtOVRKbq0cIfc2UV~e5Oa-IdePPzKhyy2s2MdMwR89kNSpIQ6iS-dsRa7iCKTfsy9Nf3q3mIHHlT-DAO8N6mLwP-JvlvOZlYzw-Uf69uUOkrGQAiJtNBt4A8LektTPB0JobjECbyGxAfM3W~QvYQSxD6UtJWY4ww~X0ZaWYw8sWdWx2kO~E6viaWYxDDEQBI-p1uizHux1mphCpXPPskf63thGivWQq4RP6dSBhLzHXAeqlO9bg5bxf2mazmQrw3NroS-HzhNyimuuhjPGQ-t3qd339FA8E4vw__' /></IBox>
                </TRow>
                <TRow>
                    <IBox> <Image src='https://media-hosting.imagekit.io//561cc334943a4387/screenshot_1733005906892.png?Expires=1733178863&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0g05T6AQestgEDW-5lVUg1nd-q0~CcVfWcZuwGR2pl2jvbX7ASBYr4AksoLnAX7OMtOQs6IxikkuhlYiQHsL93MP5etrN0tqza6U8ISjleHjXTUtp-K4aMrnBm2d6nP9g3gTN4ppmoT4NOwwQIkUL686biE4~i60wmFlBQBfRjWCXC1djwvUX0UxZSPHJCc5l-6klerWG6cNb2sn~mjm9ttBQVNmDdqgyuUmu8alZsKLiB00IdUsFc52H8JAK1ltLbYRrwgCNGzQYF1NliI7bH~c9cSK2r-VO7iBYnyiCTajPLYqrpoK7WnqTbjUwzRqkcl4wJ2SzIFM5-kapt1~Gw__' /></IBox>
                    <IBox> <Image src='https://media-hosting.imagekit.io//bf97b72edfee4f78/screenshot_1733006080811.png?Expires=1733179037&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=m6JSitX14x6e36pMZesHxuVJ2iBMk~FOPt0-ggjvyHlp2-WuM7M7vZ-aXHlKzia~i379vhw5rV2RHNXdcbZb-l5c-i-YqbUO-rECCKoesJODfvR50c~LefLAW5XryOVwDbvLt7Pf~SfEBkB2BZ1Gm-vVmRVD-VtHkJPcTqyD384gcDOxu21zXoxyQ2aIcEBrBbxKPVDjCeMzWirLBSr28yBRmann47KcRZd1ZQMZZLeD~s08F5~jrh5gnD3U5wd3N49~1AlMkGpJMw3r5fA3yndi-dzpTkXXtY-A45S3do~qEk8uKWPLVcP-aPJ1yOlEpRrVQfYT6ErNCsDdnWJyEw__' /></IBox>
                </TRow>

            </Container>

        </Component>
    )
}

export default BoxSlide;
