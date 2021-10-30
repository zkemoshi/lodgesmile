import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import KingBedIcon from '@mui/icons-material/KingBed';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaymentIcon from '@mui/icons-material/Payment';

export const menuItems = [
  {
    text: 'Home',
    icon: <HomeIcon color='primary' />,
    path: '/auth/home',
  },
  {
    text: 'Rooms',
    icon: <KingBedIcon color='primary' />,
    path: '/auth/rooms',
  },
  {
    text: 'Attendant',
    icon: <PersonAddIcon color='primary' />,
    path: '/auth/attendant',
  },
  {
    text: 'Pricing',
    icon: <PaymentIcon color='primary' />,
    path: '/auth/pricing',
  },
  {
    text: 'Reports',
    icon: <AssessmentIcon color='primary' />,
    path: '/auth/dashboard',
  },
  // {
  //   text: 'Admin',
  //   icon: <AssessmentIcon color='primary' />,
  //   path: '/admin',
  // },
  {
    text: 'Logout',
    icon: <LogoutIcon color='primary' />,
    path: '/auth/logout',
  },
];

export const attendantMenu = [
  {
    text: 'Home',
    icon: <HomeIcon color='secondary' />,
    path: '/auth/home',
  },

  {
    text: 'Logout',
    icon: <LogoutIcon color='primary' />,
    path: '/auth/logout',
  },
];
