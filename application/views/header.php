<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php echo site_name(); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="avenart dev">
    <meta name="author" content="">
    <link href="<?php echo base_url(); ?>css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>css/screen.css" rel="stylesheet">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- Le fav and touch icons -->
  </head>
  <body>
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">

      <p class="navbar-text navbar-left">
        <a class="brand" href="<?php echo base_url(); ?>">Home</a>
        </p>
       
<?php if ($this->tank_auth->is_logged_in()) { ?>

       <p class="navbar-text navbar-right">Signed in as <?php echo $this->tank_auth->get_username(); ?> (<?php echo $this->tank_auth->get_user_id(); ?>). <a href="<?php echo base_url('auth/logout'); ?>">Sign off</a></p>

<?php } else { ?>

         <p class="navbar-text navbar-right">
              <a href="<?php echo base_url('auth/login'); ?>">Sign In</a>
            </p>

<?php } ?>

      </div>
    </div>

    <div class="container">
