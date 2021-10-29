import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Avatar, CardContent, Chip, ClickAwayListener, Grid, Paper, Popper, Typography } from '@material-ui/core';
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
import { Button, Divider, message } from 'antd';

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

// ===========================|| PROFILE MENU ||=========================== //

const ProfileSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

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
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
