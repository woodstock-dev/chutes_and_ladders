export default function AvatarList({ avatarName, avatarId }) {
  return <option key={avatarId}>{avatarName}</option>;
}
