Post.create(
  10.times.map { |n|
    {
      title: "post #{n}",
      content: "post #{n} content"
    }
  }
)
