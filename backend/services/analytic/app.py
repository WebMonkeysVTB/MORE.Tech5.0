import datetime

from flask import Flask, request, jsonify
import random

app = Flask(__name__)


def calc_decay_time(time_in_path: int, queue_length: int) -> int:
    return time_in_path + 5 * queue_length


def sort_func(element):
    return element.get('decay')


@app.route('/get_most_optimal_departments', methods=['POST'])
def get_most_optimal_departments():
    departments_info = []
    content = request.get_json()
    if isinstance(content, list):
        for department_record in content:
            department_id = int(department_record.get('id'))
            time_in_path = int(department_record.get('timeInPath'))
            queue_length = int(department_record.get('queueLength'))

            departments_info.append({
                'id': department_id,
                'timeInPath': time_in_path,
                'queueLength': queue_length,
                'decay': calc_decay_time(time_in_path, queue_length)
            })
        departments_info.sort(key=sort_func)
        print(departments_info)
        return jsonify([department for department in departments_info[:5]])
    else:
        return jsonify({'error': 'Content is not LIST!'})


# workload_dep_history = {}
# queueload_dep_history = {}
# workload_atm_history = {}
# queueload_atm_history = {}
#
#
# def get_random_int_number(num_from: int, num_to: int) -> int:
#     return random.randint(num_from, num_to)
#
#
# @app.route('/workload_dep', methods=['POST'])
# def workload_dep():
#     content = request.get_json()
#     id = content.get('id')
#     count = content.get('count')
#     if id != None and count != None:
#         id, count = int(id), count(count)
#         if id not in workload_dep_history.keys(): workload_dep_history[id] = []
#         workload_dep_history[id].append({
#             'count': count,
#             'time': datetime.datetime.now()
#         })
#     return jsonify({"status": "OK"})
#
# @app.route('/queueload_dep', methods=['POST'])
# def queueload_dep():
#     content = request.get_json()
#     id = content.get('id')
#     count = content.get('count')
#     if id != None and count != None:
#         id, count = int(id), count(count)
#         if id not in queueload_dep_history.keys(): queueload_dep_history[id] = []
#         queueload_dep_history[id].append({
#             'count': count,
#             'time': datetime.datetime.now()
#         })
#     return jsonify({"status": "OK"})
#
# @app.route('/workload_atm', methods=['POST'])
# def workload_atm():
#     content = request.get_json()
#     id = content.get('id')
#     count = content.get('count')
#     if id != None and count != None:
#         id, count = int(id), count(count)
#         if id not in workload_atm_history.keys(): workload_atm_history[id] = []
#         workload_atm_history[id].append({
#             'count': count,
#             'time': datetime.datetime.now()
#         })
#     return jsonify({"status": "OK"})
#
# @app.route('/queueload_atm', methods=['POST'])
# def queueload_atm():
#     content = request.get_json()
#     id = content.get('id')
#     count = content.get('count')
#     if id != None and count != None:
#         id, count = int(id), count(count)
#         if id not in queueload_atm_history.keys(): queueload_atm_history[id] = []
#         queueload_atm_history[id].append({
#             'count': count,
#             'time': datetime.datetime.now()
#         })
#     return jsonify({"status": "OK"})
#
#
# def get_statistic_data(id: int) -> dict:
#     result_statistic = {}
#     result_statistic['workload_dep_history'] = workload_dep_history.get(id)
#     result_statistic['queueload_dep_history'] = queueload_dep_history.get(id)
#     result_statistic['workload_atm_history'] = workload_atm_history.get(id)
#     result_statistic['queueload_atm_history'] = queueload_atm_history.get(id)
#     return result_statistic
#
#
#
# @app.route('/statistic_dep', methods=['GET'])
# def statistic_dep():
#     content = request.get_json()
#     id = content.get('id')
#     current_time = content.get('current_time')
#     if id != None:
#         id = int(id)
#         return jsonify({"statistic": get_statistic_data(id)})
#     else:
#         return jsonify({"error": "Not correct ID"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)