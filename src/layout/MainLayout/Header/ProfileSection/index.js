import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Avatar,
    CardContent,
    Chip,
    ClickAwayListener,
    Paper,
    Popper,
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
import { Button, message } from 'antd';
import SubCard from '../../../../ui-component/cards/SubCard';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '../../../../store/actions'; // THEME_RTL
import { gridSpacing } from '../../../../store/constant';

import { IconSettings } from '@tabler/icons';
import { UserSwitchOutlined } from '@ant-design/icons';
import { logoutCusHandler } from '../../../../services/Customer/getCustomer';

// style const
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvatar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
                stroke: theme.palette.primary.light
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeWarning: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
}));

function valueText(value) {
    return `${value}px`;
}

const ProfileSection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const classes = useStyles();

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    //Border redux
    const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius });
    }, [dispatch, borderRadius]);

    //Font redux
    const [fontFamily, setFontFamily] = React.useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

    //RENDER
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <>
            <Chip
                classes={{ label: classes.profileLabel }}
                className={classes.profileChip}
                icon={
                    <Avatar
                        src={'data:image/png;base64,' + customization.currentCustomer.avatar}
                        className={classes.headerAvatar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <>
                                    {customization.currentCustomer.name !== null ? (
                                        <>
                                            <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                                <CardContent className={classes.cardContent}>
                                                    <Grid container direction="column" spacing={0}>
                                                        <Grid item className={classes.flex}>
                                                            <Typography component="span" variant="h4" className={classes.name}>
                                                                Xin chào,&nbsp;
                                                            </Typography>
                                                            <Typography variant="h4">{customization.currentCustomer.name}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="subtitle2">
                                                                Tên này sẽ được sử dụng khi bạn đặt hàng
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                                <br></br>

                                                <Button
                                                    type="primary"
                                                    icon={<UserSwitchOutlined />}
                                                    style={{
                                                        fontSize: 12,
                                                        padding: '2px 15px 2px 15px',
                                                        border: 'none',
                                                        backgroundColor: 'red',
                                                        borderRadius: 8,
                                                        margin: 'auto',
                                                        textAlign: 'center',
                                                        width: '100%'
                                                    }}
                                                    onClick={() => {
                                                        logoutCusHandler();
                                                        message.success('Đã đăng xuất');
                                                        window.location.href = '/';
                                                    }}
                                                >
                                                    Đăng xuất
                                                </Button>
                                            </MainCard>
                                        </>
                                    ) : (
                                        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container direction="column" spacing={0}>
                                                    <Grid item className={classes.flex}>
                                                        <Typography component="span" variant="h4" className={classes.name}>
                                                            Xin chào,&nbsp;
                                                        </Typography>
                                                        <Typography variant="h4">bạn chưa đăng nhập</Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <Button
                                                type="primary"
                                                icon={<UserSwitchOutlined />}
                                                style={{
                                                    fontSize: 12,
                                                    padding: '2px 15px 2px 15px',
                                                    borderRadius: 8,
                                                    margin: 'auto',
                                                    textAlign: 'center',
                                                    width: '100%'
                                                }}
                                                onClick={() => {
                                                    window.location.href = '/';
                                                }}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </MainCard>
                                    )}
                                    <PerfectScrollbar component="div">
                                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                                            <Grid item xs={12}>
                                                {/* font family */}
                                                <SubCard title="Chỉnh font (redux)">
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-label="font-family"
                                                            value={fontFamily}
                                                            onChange={(e) => setFontFamily(e.target.value)}
                                                            name="row-radio-buttons-group"
                                                        >
                                                            <FormControlLabel
                                                                value="Poppins"
                                                                control={<Radio />}
                                                                label="Poppins"
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': { fontSize: 28 },
                                                                    '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                                                }}
                                                            />
                                                            <FormControlLabel
                                                                value="Inter"
                                                                control={<Radio />}
                                                                label="Inter"
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': { fontSize: 28 },
                                                                    '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                                                }}
                                                            />
                                                            <FormControlLabel
                                                                value="Roboto"
                                                                control={<Radio />}
                                                                label="Roboto"
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': { fontSize: 28 },
                                                                    '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                                                }}
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    </PerfectScrollbar>
                                </>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
