export default function saveCurrentWorkspace() {
  this.props.saveWorkspace(this.workspaceName.value);
  this.workspaceName.value = '';
}
