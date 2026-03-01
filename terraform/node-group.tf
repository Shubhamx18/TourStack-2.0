resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "tourstack-nodes"
  node_role_arn   = aws_iam_role.node_role.arn
  subnet_ids      = data.aws_subnets.default.ids
  instance_types  = [var.node_instance_type]

  scaling_config {
    desired_size = 2
    max_size     = 2
    min_size     = 1
  }

  remote_access {
    ec2_ssh_key = "eks-nodes-tourstack-eks"
  }

  depends_on = [
    aws_iam_role_policy_attachment.node_worker_policy,
    aws_iam_role_policy_attachment.node_cni_policy,
    aws_iam_role_policy_attachment.node_ecr_policy,
  ]

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [node_role_arn]
  }
}
```

Removed `remote_access` from `ignore_changes` so the SSH key gets properly attached.

Now run the pipeline. After it finishes, go to AWS Console and check:
```
EC2 → Instances → your node → check if it has a Public IPv4 address
