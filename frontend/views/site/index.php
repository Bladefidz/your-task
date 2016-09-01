<?php
	$this->title = 'Your Task List';
	$task = Yii::$app->db->createCommand('SELECT * FROM task')->queryAll();
?>
<div class="site-index">
	<input type="hidden" id="_csrf" value="<?php echo Yii::$app->request->getCsrfToken() ?>">
	<input type="hidden" id="lastOrder" value="">
	<div class="col-lg-12 header">
		<h3>Your Task List</h3>
	</div>
	<div class="col-lg-6">
		<input type="text" name="todo" id="newTodo" class="input-md form-control" placeholder="Task to do">
	</div>
	<div class="col-lg-6">
		<input type="date" name="due" id="newDue" class="input-md form-control">
	</div>
	<div class="col-lg-12 check-all-complete">
		<input type="checkbox" name="mark-complete" id="mark-all">
		<span>Mark all as complete</span>
	</div>
	<div class="row">
		<div class="col-lg-12 table-task">
			<div class="panel panel-default">
				<table class="table table-responsive">
					<tbody id="task-list">
					<?php foreach ($task as $key => $value): ?>
						<tr>
							<td>
								<input type="checkbox" name="check" <?php if ($value['Done'] > 0){ echo "checked"; } ?> class="checkbox">
							</td>
							<td>
								<span id="task-text-1"><?php echo $value['Text'] ?></span>
							</td>
							<td>
								<span id="task-text-1"><?php echo $value['Date'] ?></span>
							</td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-6">
			<label id="counter" class="pull-left"></label>
		</div>
		<div class="col-lg-6">
			<button class="btn-lg btn-danger pull-right" id="clear-complete"></button>
		</div>
	</div>
</div>