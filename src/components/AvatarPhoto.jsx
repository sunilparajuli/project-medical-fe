import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function AvatarPhoto({photo}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={photo?.photo[0]?.data} sx={{ height: '70px', width: '70px' }} />
    </Stack>
  );
}
