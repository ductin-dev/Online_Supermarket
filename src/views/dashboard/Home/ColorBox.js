import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Box, Card, Grid, Typography } from '@material-ui/core';

//= ==============================|| COLOR BOX ||===============================//

const ColorBox = ({ bgcolor, title, data, dark }) => {
    const theme = useTheme();
    return (
        <>
            <Card sx={{ mb: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 4.5,
                        bgcolor,
                        color: dark ? theme.palette.grey[800] : '#ffffff'
                    }}
                >
                    {title && (
                        <Typography variant="subtitle1" color="inherit">
                            {title}
                        </Typography>
                    )}
                    {!title && <Box sx={{ p: 1.15 }} />}
                </Box>
            </Card>
            {data && (
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle2">{data.label}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                            {data.color}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

export default ColorBox;
