import { Request, Response } from 'express';

import knex from '../database/connection';

class PointsController {
  async list(req: Request, res: Response) {
    const { city, state, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('state', String(state))
      .distinct()
      .select('points.*');

    return res.json(points);
  }

  async detail(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(404).json({ message: 'Point not found' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point, items });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      phone,
      latitude,
      longitude,
      city,
      state,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: 'https://picsum.photos/300/200',
      name,
      email,
      phone,
      latitude,
      longitude,
      city,
      state,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
