export default function JobTitleInput({ value, onChange, onStart }) {
  return (
    <label className="job-input">
      Job&nbsp;Title:&nbsp;
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Storm Trooper"
        onKeyDown={(e) => e.key === "Enter" && onStart()}
      />
    </label>
  );
}
