import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export default function LocationMap() {
  return (
    <Grid item xs={12} lg={4} >
      <Typography typography="h6" textAlign="center">Visit us</Typography>
      <Box sx={{display:"flex", justifyContent:"center", my:5}}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d806.0333543526149!2d-104.84414943550574!3d39.682822188705124!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1679347895928!5m2!1sen!2sus" title='map'  loading="lazy" style={{border:"0"}} width="300" height="150"  ></iframe>
      </Box>
    </Grid>
  )
}
