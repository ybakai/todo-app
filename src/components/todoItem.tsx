type TaskProps = {
  id: number;
  task: string;
  complete: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TodoItem(props: TaskProps) {
  return (
    <div className='todo-item'>
      <span className={` ${props.complete ? "noactive" : ""}`}>
        {props.task}
      </span>
      <div>
        <button
          onClick={() => props.onToggle(props.id)}
          className="done-button"
        >
          ✔
        </button>
        <button
          onClick={() => props.onDelete(props.id)}
          className="delete-button"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
