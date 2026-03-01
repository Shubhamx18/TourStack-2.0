resource "aws_eks_node_group" "main" {
  cluster_name    = var.cluster_name
  node_group_name = "tourstack-nodes"
  node_role_arn   = data.aws_iam_role.node_group_role.arn
  subnet_ids      = data.aws_subnets.default.ids

  scaling_config {
    desired_size = 2
    max_size     = 2
    min_size     = 1
  }

  instance_types = [var.node_instance_type]

  lifecycle {
    ignore_changes = all
  }
}
