import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import './YourListingsCard.css';



function YourListingsCard({listing}) {

    const history = useHistory();

    const dispatch = useDispatch();

    function handleDelete() {
        Swal.fire({
            text: 'Are you sure you want to delete?',
            icon: 'question',
            confirmButtonText: 'DELETE',
            confirmButtonColor: '#1976d2',
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch({ type: 'DELETE_LISTING',
                    payload: listing.id });
            } 
          })
    }

    const handleEdit = (listing) => {
        history.push(`/edit/${listing.id}`)
        dispatch({ type: 'SET_EDIT_STATE', payload: listing})
    }

    return (
        <Card className='listing-card' sx={{ maxWidth: 250 }}>
        <CardMedia
            className='listing-card-img' 
            image={listing.image}
        />
        <Typography sx={{ fontWeight: 'bold' }} className="card-text-container" >
            {listing.item}
        </Typography>
        <CardContent>
            <Typography className="card-text-container"  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {listing.description.substring(0, 30)}...
            </Typography>
        </CardContent>
        <CardActions className='icons'>
            <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
                <IconButton onClick={() => handleEdit(listing)}>
                    <EditIcon className='edit-icon' />
                </IconButton>
            </Tooltip>
        </CardActions>
    </Card>
    )
}

export default YourListingsCard;