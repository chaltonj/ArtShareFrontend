import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "regenerator-runtime";
import {DropzoneArea} from 'material-ui-dropzone'

export default function PaintingDetails() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <DropzoneArea 
        acceptedFiles={ ['image/*'] }
        filesLimit={ 1 } 
        maxFileSize={ 20000000 } />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="artName" label="Name of the piece of art" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="artistName" label="Name of the artist" fullWidth />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField required multiline id="notes" label="Tell us about this piece?" fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}