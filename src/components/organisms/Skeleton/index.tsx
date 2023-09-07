import { Grid, Skeleton } from "@mui/material"

const CustomSkeleton: React.FC = () => {
    return (
        <Grid container>
            {Array.from(new Array(6)).map((item, index) => (
                <Grid item lg={4} md={6} sm={12} xs={12} p={1} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={250} />
                </Grid>
            ))}
        </Grid>
    )
}

export default CustomSkeleton;