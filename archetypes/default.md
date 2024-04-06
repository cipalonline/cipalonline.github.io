+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
description = "Sample description."
tags = [
    "tag1",
    "tag2",
]
categories = [
    "category",
]
aliases = ['{{ replace .File.ContentBaseName "-" " " | title }}']
+++