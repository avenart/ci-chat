      <div class="content">
        <div class="row" style="margin-top: 60px;">
          <div style="margin:0 auto;width:400px;">

<?php
$login = array(
	'name'	=> 'login',
	'id'	=> 'login',
	'class' => 'form-control',
	'value' => set_value('login'),
	'maxlength'	=> 80,
	'size'	=> 30,
);
if ($login_by_username AND $login_by_email) {
	$login_label = 'Email or login';
} else if ($login_by_username) {
	$login_label = 'Login';
} else {
	$login_label = 'Email';
}
$password = array(
	'name'	=> 'password',
	'id'	=> 'password',
	'class' => 'form-control',
	'size'	=> 30,
);
$remember = array(
	'name'	=> 'remember',
	'id'	=> 'remember',
	'value'	=> 1,
	'checked'	=> set_value('remember'),
	'style' => 'margin:0;padding:0',
);
$submit = array('type' => 'submit',
'class' => 'btn btn-primary' );
?>
<?php echo form_open($this->uri->uri_string()); ?>
<table>
	<tr>
		<td><?php echo form_label($login_label, $login['id']); ?></td>
		<td><?php echo form_input($login); ?></td>
		<td style="color: red;"><?php echo form_error($login['name']); ?><?php echo isset($errors[$login['name']])?$errors[$login['name']]:''; ?></td>
	</tr>
	<tr>
		<td><?php echo form_label('Password', $password['id']); ?></td>
		<td><?php echo form_password($password); ?></td>
		<td style="color: red;"><?php echo form_error($password['name']); ?><?php echo isset($errors[$password['name']])?$errors[$password['name']]:''; ?></td>
	</tr>
	<tr>
		<td><?php echo form_label('Remember me', $remember['id']); ?></td>
		<td colspan="2">
			<?php echo form_checkbox($remember); ?>			
		</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td colspan="2"><?php echo form_submit($submit, 'Login'); ?></td>
	</tr>
	<tr>
       		<td>
		<?php if ($this->config->item('allow_registration', 'tank_auth')) echo anchor('/auth/register/', 'Register').' &nbsp; | &nbsp; '; ?>
		<?php echo anchor('/auth/forgot_password/', 'Forgot Password'); ?>
		</td>
		<td colspan="2">&nbsp;</td>
	</tr>
</table>

<?php echo form_close(); ?>

          </div>
        </div>
      </div>

