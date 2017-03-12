/*!
 * todo scripts
 * bq-hentai | 03/12/2017
 */

{
  const { Observable } = Rx;

  const log = (..._) => console.log(..._);
  const logError = error => console.error(error);

  const $input = $('.todo-input');
  const $todoList = $('.todo-list');

  const addTodo = todo => $todoList.append(`
    <li class="todo-item">
      <div class="todo-item-name" title="${todo}">${todo}</div>
      <button class="btn remove">remove</button>
    </li>
  `);

  const removeTodo = $todo => $todo.remove();

  const clearInput = _ => $input.val(''); 

  const input$ = Observable
    .fromEvent($input, 'keyup')
    .filter(evt => evt.keyCode === 13)
    .map(evt => evt.target.value)
    .do(log);

  const remove$ = Observable
    .fromEvent($todoList, 'click')
    .filter(evt => $(evt.target).hasClass('remove'))
    .map(evt => $(evt.target).parent())
    .do(log);

  input$.subscribe(
    todo => {
      addTodo(todo);
      clearInput();
    },
    logError
  );

  remove$.subscribe(
    removeTodo,
    logError
  );
}
