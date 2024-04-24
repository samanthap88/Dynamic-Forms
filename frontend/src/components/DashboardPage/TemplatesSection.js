import Grid from '@mui/material/Unstable_Grid2';
import BigTemplate from './BigTemplate';
export default function TemplatesSection() {
    return (
        <div className='mt-10'>
            <Grid container spacing={2}  className="flex justify-center " >
                <Grid className=""item >
                    {<BigTemplate title="Quiz"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Contact"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="RSVP"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Invitation"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Survey"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Orders"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Quiz"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Contact"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="RSVP"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Invitation"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Survey"/>}
                </Grid>
                <Grid className=""item >
                    {<BigTemplate title="Orders"/>}
                </Grid>
    
            </Grid>
        </div>
    )
}