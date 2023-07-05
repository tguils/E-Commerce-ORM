const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const allCategories = await Category.findAll({
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          },
        ],
      });
  
      const categories = allCategories.map((category) =>
        category.get({ plain: true })
      );
  
      res.render('categories', {
        categories,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    const categories = oneCategory.map((category) =>
      category.get({ plain: true })
    );

    res.render('categories', {
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body.category_name, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    const createdCategory = newCategory.map((category) =>
      category.get({ plain: true })
    );

    res.render('createdCategory', {
      createdCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat = await Category.update(req.body, {
      include: [
        {
          where: {
          id: req.params.id
          },
        },
      ],
    });

    const updatedItem = updatedCat.map((category) =>
      category.get({ plain: true })
    );

    res.render('updatedItem', {
      updatedItem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
