<?php

namespace App\Controllers;

use \CodeIgniter\Controller;
use App\Models\myPlacesModel;


class Home extends BaseController
{
	public function index()
	{
	
		// return view('home');
		//$this->load->helper('url');
		// $this->load->database();
		$myPlaceModel = new myPlacesModel();
		$data['subjects'] = $myPlaceModel->findAll();
		
		return view('home', $data);

	}

	public function saveMyPlaces()
	{
		$myPlaceModel = new myPlacesModel();

		//get form data
		$title = $this->request->getPost('title');
		$description = $this->request->getPost('description');
		$latitude = $this->request->getPost('coordinatesLa');
		$longitude = $this->request->getPost('coordinatesLo');
		$open =  $this->request->getPost('open');
		$keywords = $this->request->getPost('keywords');

		//store data in var
		$newData = [
		'title' => $title,
		'description' => $description,
		'latitude' => $latitude,
		'longitude' => $longitude,
		'open' => $open,
		'keywords' => $keywords,
		];	
	//store in db
	$myPlaceModel->insert($newData);			
	return redirect()->to(site_url());	
	}


public function editMyPlaces()
{
	$myPlaceModel = new myPlacesModel();

		//get form data
		$id = $this->request->getPost('id');
		$title = $this->request->getPost('title');
		$description = $this->request->getPost('description');
		$latitude = $this->request->getPost('coordinatesLa');
		$longitude = $this->request->getPost('coordinatesLo');
		$open =  $this->request->getPost('open');
		$keywords = $this->request->getPost('keywords');

		//store data in var
		$updateData = [
		'title' => $title,
		'description' => $description,
		'latitude' => $latitude,
		'longitude' => $longitude,
		'open' => $open,
		'keywords' => $keywords,
		];	
	//edit and save in db
	// $myPlaceModel->set($updateData);
	$myPlaceModel->update($id, $updateData);
	return redirect()->to(site_url());	

}

//delet function
public function deleteMyPlaces()
{
	$myPlaceModel = new myPlacesModel();
	//get form data
	$id = $this->request->getPost('id');
//delete from db
$myPlaceModel->delete($id);
return redirect()->to(site_url());	
}



}
