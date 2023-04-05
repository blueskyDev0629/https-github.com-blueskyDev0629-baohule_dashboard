import { Box, Grid } from "@mui/material";
import RadioIcon from '@mui/icons-material/Radio';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from "@mui/styles";
import { Stack } from "@mui/material";
import {FristStatiscData} from 'src/models/crypto_order';

const AdminSBox = styled(Box)({
    height: "80px",
    background: "#171d37",
    borderStyle: "outset",
    border: "0px",
    backdropFilter: "blur(25px)",
    borderRadius: "20px",
    marginTop: "10px",
    padding:"0.5rem 1rem"
})

interface PrimaryBoxProps{
    data: FristStatiscData;
}

export default function PrimaryBox(props) {
    const {data} = props 
    return (
        <>
            <Stack 
            direction={"column"} 
            spacing={2}
            sx={{width:"100%"}}
            >
                <AdminSBox>
                    <Grid container
                        sx={{
                            height: "100%"
                        }}>
                        <Grid item xs={10} sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}>
                            <Grid item xs={12}
                                sx={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                Today's players Winnings
                            </Grid>
                            <Grid item xs={12}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize:"18px",
                                    color:"#e563ab"
                                }}>
                                {data.toPyWinNum}
                            </Grid>
                        </Grid>
                        <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent:"flex-end"}}>
                            <Box sx={{
                                backgroundColor: "#0075FF",
                                width: "45px",
                                height: "45px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "1rem"
                            }}>
                                <RadioIcon />
                            </Box>
                        </Grid>
                    </Grid>
                </AdminSBox>
                <AdminSBox>
                    <Grid container
                        sx={{
                            height: "100%"
                        }}>
                        <Grid item xs={10} sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}>
                            <Grid item xs={12}
                                sx={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                Total active Bots
                            </Grid>
                            <Grid item xs={12}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize:"18px",
                                    color:"#e563ab"
                                }}>
                                {data.totalActBotNum}
                            </Grid>
                        </Grid>
                        <Grid item xs={2} sx={{ display: "flex", alignItems: "center" , justifyContent:"flex-end"}}>
                            <Box sx={{
                                backgroundColor: "#0075FF",
                                width: "45px",
                                height: "45px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "1rem"
                            }}>
                                <LanguageIcon />
                            </Box>
                        </Grid>
                    </Grid>
                </AdminSBox>
            </Stack>
        </>
    )
}