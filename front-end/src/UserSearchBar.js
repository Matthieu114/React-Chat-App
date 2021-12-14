import {styled, alpha} from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import {Box, AppBar, Toolbar, InputBase} from '@mui/material';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: '16px',
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1)
  },
  width: '100%'
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '400px'
  }
}));

export default function UserSearchBar({setUsers}) {
  const searchUsers = async () => {
    const {data: users} = await axios.get('http://localhost:3001/users', {});
    const query = document.getElementById('user-search').value;
    setUsers(
      users.filter((user) => {
        const name = user.username;
        return name?.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const onKeyPress = ({nativeEvent: {key: keyValue}}) => {
    if (keyValue === 'Enter') searchUsers();
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position='static' sx={{bgcolor: 'white', boxShadow: 'none'}}>
        <Toolbar sx={{margin: '-1rem -2rem'}}>
          <Search>
            <SearchIconWrapper onClick={searchUsers}>
              <SearchIcon color='primary' />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Type the name of a user...'
              inputProps={{'aria-label': 'search'}}
              id='user-search'
              name='user-search'
              onKeyPress={onKeyPress}
              onInput={searchUsers}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
