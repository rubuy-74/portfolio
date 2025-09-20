```There are instructions to implement this for your CV in the Github Repository```
# Overview

Before, every time I needed my CV, I had to go to [Overleaf](https://www.overleaf.com), download it, and then upload it wherever I wanted to use it. Because of this, I usually ended up with **5 or 10 different versions of my CV** on my computer or phone. To solve this, I first decided to move from LaTeX to Typst. 

With Typst, I can keep the source code in Git, make changes directly in my IDE, and I don’t need to upload files to **Overleaf** or use a **bad LaTeX editor**. This solved the problem of versioning, because on Overleaf you either overwrite the CV or you create a bunch of copies that are confusing to manage.

But there was still another problem: **how to always have easy access to the most updated version of my CV?** A few weeks before doing this project, I saw someone on Twitter doing something similar, but at the time I thought it would be too much work. Then one Sunday, when I had nothing to do, I thought: **“Can I actually finish this in one afternoon?”** And I just went for it.

# Technologies and Categories

- [Typst](https://typst.app/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- Github Actions
- CI/CD

# What did I do?
First, I created a GitHub repository and added a .typst file with a template (thanks to [Duarte Gonçalves](https://github.com/duartegonc/) for the template). Then I updated the CV with my own **experience and projects**. After that, I set up a Cloudflare Worker with access to an **R2 bucket**, where I store the CV file. 

Finally, I made a GitHub workflow to **upload the CV automatically** to the bucket and **deploy the new version of the worker** whenever I push changes.

# What have I learned?

The first thing I learned was Typst. It’s really nice for developers, much easier and more modern compared to LaTeX. It’s written in Rust **(for the nerds)**, and it even has **type safety** (not super important for a CV, but maybe for bigger documents). 

I also **learned a lot about Cloudflare Workers**, and I think they are great for small projects like this. They are serverless, very simple to configure, and they run on Cloudflare’s global edge network, which is fast and efficient. 

I already knew GitHub Actions, but it was **good to practice** again in a different project.

# Would I do something differently?

Since this is a small project, I don’t think I would change much. Maybe I could make it a **bit more modular and customizable**, but for my use case that was not really needed.
