k8s_yaml('deployment.yaml')

custom_build(
  'telliottio/blogarchive',
  'make build',
  ["deployment.yaml"],
  tag="latest"
)

k8s_resource('blogarchive', port_forwards='8080:80')