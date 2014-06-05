<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	function __construct()
	{
		parent::__construct();

		$this->load->helper('url');
		$this->load->library('tank_auth');
	}

	public function index()
	{
		$this->load->view('header');
	if (!$this->tank_auth->is_logged_in()) {
		$this->load->view('home');
		$this->load->view('footer');
	} else {
			$this->load->view('home_logged');
			$this->load->view('footer_logged');
	}
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
