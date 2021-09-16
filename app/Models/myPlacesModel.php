<?php

namespace App\Models;

use CodeIgniter\Model;

class myPlacesModel extends Model 
{
	protected $table='my_places';
	protected $primaryKey='id';
	protected $allowedFields=['title', 'description', 'latitude', 'longitude', 'open', 'keywords'];




}


?>